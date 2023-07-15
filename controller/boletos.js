/**
 * @author: Gabriel de Freitas Santos Sábio
 * @date: 12/07/2023
 * @desc: custom route for fetching data
*/

function BoletosController() {
    var Persistence        = require('../persistence/persistenceFactory.js');
    var persistence        = new Persistence();

    // add one object
    this.add = function (req, res, classe) {
        var allErrors       = [];
        var validator       = new (require('./validators/validatorFactory.js'))();
        var validatorClasse = new (require('./validators/boletos.js'))();

        var Message         = require('../entity/message.js');

        Promise.all([
            new Promise((resolve, reject)=>{
                var errors  = validator.checkBody(req);
                if(errors.length > 0){
                    allErrors.push(errors);
                    resolve();
                }         
                else resolve();
            }),

            new Promise((resolve, reject)=>{
                var errors  = validatorClasse.checkBody(req);
                if(errors.length > 0){
                    allErrors.push(errors);
                    resolve();
                }         
                else resolve();
            }),

            // O Lote deve existir
            new Promise((resolve, reject)=>{
                persistence.getQttById(req.body.id_lote, 'lotes')
                .then((qtt) => {
                    if(qtt == 0) {
                        const params = {
                            code:     400,
                            message:  'Lote inválido',
                            response: '',
                            location: 'controller.boletos.add',
                            param:    'id_lote',
                            value:    req.body.id_lote
                        };
                
                        var message = new Message(params);
                        allErrors.push(message);

                        resolve();
                    }    
                    else resolve();
                })
                .catch((erro) => { res.status(erro.code).send(JSON.parse(JSON.stringify(erro))); } );
            }),
    
            // Impedir se já existe uma boleto para a linha digitável
            new Promise((resolve, reject)=>{
                persistence.isNameInUse(req.body.linha_digitavel, 0, classe)
                .then((data) => {
                    if (data) {
                        const params = {
                            code:     400,
                            message:  'Boleto já existe para a linha digitável',
                            response: '',
                            location: 'controller.boletos.add',
                            param:    'linha_digitavel',
                            value:    req.body.linha_digitavel
                    };
                
                        var message = new Message(params);
                        allErrors.push(message);

                        resolve();
                    }    
                    else resolve();
                }) // fim do then
                .catch((erro) => { res.status(erro.code).send(JSON.parse(JSON.stringify(erro))); } );
            })
        ]).then(()=>{
            if (allErrors.length > 0){
                res.status(400).send(allErrors);
            } 
            else {
                var params = {
                    nome_sacado:              req.body.nome_sacado,
                    id_lote:                  req.body.id_lote,
                    valor:                    parseFloat(req.body.valor),
                    linha_digitavel:          req.body.linha_digitavel,
                    ativo:                    req.body.ativo
                }

                var Boletos = require('../entity/boletos.js');    
                var boletos = new Boletos(params);
        
                persistence.add(boletos, classe)
                .then  ((data) => { res.send  (JSON.parse(JSON.stringify(data))); } ) 
                .catch ((erro) => { res.status(erro.code).send(JSON.parse(JSON.stringify(erro))); } )
            }
        })
        // Acho que esse catch deve mudar
        .catch(reason=>{
            console.warn('Failed!', reason, ' ', allErrors);
            res.status(400).send(allErrors);
        });
    }; // fim this.add = function (req, res) {


    function getNomeUnidade(unidade) {
        return new Promise(resolve => {
            setTimeout(() => {
                // preparar o nome do lote
                var tamanho       = unidade.length;
                var nomeUnidade   = "" + unidade;
  
                if  (tamanho < 4) {
                    for (let i = 0; i < (4-tamanho); i++) {
                        nomeUnidade = "0" + nomeUnidade;
                    }
                };

                resolve(nomeUnidade);
            }, 2000);
        });
    }; //getNomeUnidade(unidade)


    function getIdUnidade(nomeUnidade) {
        return new Promise(resolve => {
            setTimeout(() => {
                var id = 0;

                persistence.getByName(nomeUnidade, 'lotes')
                .then(data => {
                    // Manipular o resultado em caso de sucesso
                    data.forEach((item) => {
                        // Realize as manipulações desejadas em cada item do JSON
                        id = item.id;
                    });
                    resolve(id);
                })
                .catch(error => {
                    // Lidar com erros
                    console.error(error);
                });
            }, 2000);
        });
    }; //getIdUnidade(nomeUnidade)

    
    function addBoleto(nome, idLote, valor, linhaDigitavel) {
        return new Promise(resolve => {
            setTimeout(() => {
                var mensagem = "";
                        
                var params = {
                    nome_sacado:              nome,
                    id_lote:                  idLote,
                    valor:                    parseFloat(valor),
                    linha_digitavel:          linhaDigitavel,
                    ativo:                    1
                }
    

                // Exibir os valores
                console.log('Nome_Sacado:',     params.nome_sacado);
                console.log('Id_Lote:',         params.id_lote);
                console.log('Valor:',           params.valor);
                console.log('Linha Digitável:', params.linha_digitavel);
                console.log('Ativo:',           params.ativo);
                console.log('----------------------');
            
            
                var Boletos = require('../entity/boletos.js');    
                var boletos = new Boletos(params);
                
                persistence.add(boletos, 'boletos')
                .then  ((data) => { mensagem = "OK"; } ) 
                .catch ((erro) => { mensagem = erro.code; } )

                resolve(mensagem);
            }, 2000);
        });
    }; //addBoleto(nparams)


    async function addLinha(linha) {
        try {
            // Obter os valores separados por ponto e vírgula
            const [nome, unidade, valor, linhaDigitavel] = linha['nome;unidade;valor;linha_digitavel'].split(';');

            const nomeUnidade = await getNomeUnidade(unidade);
            const idLote      = await getIdUnidade(nomeUnidade);
            const mensagem    = await addBoleto(nome, idLote, valor, linhaDigitavel);

        }
        catch(error) {
            console.error('Ocorreu um erro:', error);
        };

    }; //addLinha(linha)



    this.addCSV = function (req, res, classe) {
        const fs          = require('fs');
        const csv         = require('csv-parser');
        const results     = [];
        var   mensagem    = "";

        fs.createReadStream(req.body.path)
        .pipe(csv())
        .on ('data',(data) => {

            /*
            const fields      = Object.keys(data)[0].split(';');   // Obter os nomes dos campos
            const values      = Object.values(data)[0].split(';'); // Obter os valores dos campos

            fields.forEach((field, index) => {
                //field         --> nome da coluna no arquivo csv
                //index         --> 0 para primeira coluna
                //                  1 para segunda coluna
                //                  e assimpor diante
                //fields[index] --> nome da coluna
                //values[index] --> conteúdo da coluna
                //console.log(index + " " + fields[index] + " " + values[index] + " " + values[index].length);
            });
            */

            results.push(data);
        })
        .on ('end', () => {
            results.forEach(linha => {
                addLinha(linha);
            });

            console.log("path " + req.body.path);
            // Faça algo com os dados do csv aqui
        });

        res.send(mensagem);

    }; // fim this.addCSV


    // get PDF and split it
    this.splitPDF = async function (req) {
        // Criar uma matriz 3x2 para cnter a ordem de cada boleto a ser impressor
        const vetor = [
          [3],
          [1],
          [2]
        ];

        const fs = require('fs');
        const { PDFDocument } = require('pdf-lib');

        const pdfBuffer = fs.readFileSync(req.body.path);
        const pdfDoc    = await PDFDocument.load(pdfBuffer);
        const numPages  = pdfDoc.getPageCount();
          
        for (let i = 0; i < numPages; i++) {
            const newPdfDoc    = await PDFDocument.create();
            const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
            newPdfDoc.addPage(copiedPage);
          
            const outputPath   = `${vetor[i]}.pdf`;
           
            const pdfBytes     = await newPdfDoc.save();
          
             fs.writeFileSync(outputPath, pdfBytes);
            console.log(`Arquivo ${outputPath} gerado.`);
        }

    }; // fim this.splitPDF

    
    function generatePDF ( req, res) {
        return new Promise(resolve => {
            setTimeout(() => {
                const axios = require('axios');

                axios.get("http://" + req.headers.host + "/rest/boletos/getAll")
                .then(response => {
                    const dados = response.data; // Obtém o JSON retornado pelo endpoint

                    // Chama a função para criar o documento PDF
                    createPDF(req.body.path, dados).catch(console.error);
            
                    // Enviar os resposta            
                    res.send("Veja o arquivo " + req.body.path + " gerado");
                    resolve();
                })
                .catch(error => {
                    console.error('Erro:', error.message);
                });
            });
        });

    }; //generatePDF


    function composeBase64 ( req, res ) {
        return new Promise(resolve => {
            setTimeout(() => {                
                if (req.body.relatorio == 1) {
                    // Exemplo de uso
                    const fs = require('fs');
                    const caminhoArquivoPDF = req.body.path; //'caminho/para/o/arquivo.pdf';
                    const base64PDF         = generateBase64(caminhoArquivoPDF);
            
                    pathBase64  = req.body.path;
                    posicao     = pathBase64.indexOf('.pdf');
                    pathBase64  = pathBase64.substring(0, posicao) + "Base64" + ".pdf";
                    console.log ("Path Base64 " + pathBase64);

                    createPDFFromBase64(base64PDF, pathBase64);

                    if (base64PDF) {
                        console.log('Conteúdo do PDF em Base64:', base64PDF);
                    }
                }

            });
        });
    }; //composeBase64


    // Função para criar o documento PDF
    async function createPDF( path, dados ) {
        const { PDFDocument, rgb } = require('pdf-lib');
        const fs = require('fs');

        // Cria um novo documento PDF
        const pdfDoc = await PDFDocument.create();

        // Adiciona uma nova página ao documento
        const page = pdfDoc.addPage();

        // Define a posição inicial do conteúdo
        const x = 50;
        let y = page.getHeight() - 50;

        // Define as informações dos cabeçalhos da tabela
        const headers = ['id', 'nome_sacado', 'id_lote', 'valor', 'linha_digitavel'];
        const headerFont = await pdfDoc.embedFont('Helvetica-Bold');

        const dataFont = await pdfDoc.embedFont('Helvetica');

        // Define o tamanho das células
        const cellWidth = 80;
        const cellHeight = 20;

        // Escreve os cabeçalhos na página
        let headerX = x;
        headers.forEach((header, index) => {
            page.drawText(header, { x: headerX, y, font: headerFont, size: 10, color: rgb(0, 0, 0) });
            headerX += cellWidth;
        });
        y -= cellHeight;

        // Escreve os dados na página
        /*
        dados.forEach((row) => {
                let dataX = x;
                row.forEach((cell) => {
                     page.drawText(cell.toString(), { x: dataX, y, font: dataFont, size: 10, color: rgb(0, 0, 0) });
                     dataX += cellWidth;
                });
                y -= cellHeight;
        });
        */
        dados.forEach((item) => {
            // Realize as manipulações desejadas em cada item do JSON
            const id              = item.id;
            const nome_sacado     = item.nome_sacado.toUpperCase();
            const id_lote         = item.id_lote;
            const valor           = item.valor;
            const linha_digitavel = item.linha_digitavel;

            console.log ("id " + id + " nome_Sacado " + nome_sacado + " id lote " + id_lote + " valor " + valor + " linha digitavel " + linha_digitavel);

            let dataX = x;

            page.drawText(id.toString(),              { x: dataX, y, font: dataFont, size: 6, color: rgb(0, 0, 0) });
            dataX += cellWidth;
            page.drawText(nome_sacado.toString(),     { x: dataX, y, font: dataFont, size: 6, color: rgb(0, 0, 0) });
            dataX += cellWidth;
            page.drawText(id_lote.toString(),         { x: dataX, y, font: dataFont, size: 6, color: rgb(0, 0, 0) });
            dataX += cellWidth;
            page.drawText(valor.toString(),           { x: dataX, y, font: dataFont, size: 6, color: rgb(0, 0, 0) });
            dataX += cellWidth;
            page.drawText(linha_digitavel.toString(), { x: dataX, y, font: dataFont, size: 6, color: rgb(0, 0, 0) });
            dataX += cellWidth;

            y -= cellHeight;
        });
        

        // Salva o documento PDF em um arquivo
        const pdfBytes = await pdfDoc.save();
        /*
        fs.writeFileSync('dados.pdf', pdfBytes);
        */
        fs.writeFileSync(path, pdfBytes);
        
    }; //createPDF


    // Função para ler o arquivo PDF e retornar seu conteúdo codificado em Base64
    function generateBase64(path) {
        const fs = require('fs');

        try {
              // Lê o arquivo PDF como um buffer
              const arquivoBuffer = fs.readFileSync(path);
  
              // Codifica o conteúdo do arquivo em Base64
              const base64Data = arquivoBuffer.toString('base64');
  
              // Retorna o conteúdo codificado em Base64
              return base64Data;
        } catch (error) {
              console.error('Erro ao ler o arquivo:', error);
              return null;
        }
    }; //generateBase64

 
    // Função para decodificar o conteúdo Base64 e salvar em um arquivo PDF
    function createPDFFromBase64(base64Content, path) {
        const fs = require('fs');

        const decodedContent = Buffer.from(base64Content, 'base64');
        fs.writeFileSync(path, decodedContent);
    }; //createPDFFromBase64


    this.print = async function (req, res) {
        await generatePDF(req, res);

        console.log ("aqui " + req.body.relatorio + " " + req.body.path);

        await composeBase64(req, res);
    }; // print
}

module.exports = BoletosController;