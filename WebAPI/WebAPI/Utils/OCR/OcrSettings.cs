using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;

namespace WebAPI.Utils.OCR
{
    public class OcrSettings
    {
        private readonly string _subscriptionKey = "0ae2d29327374666bacfffcd1bdc0b79"; //pegar recurso do blob storage

        private readonly string _endpoint = "https://vitalhubvision.cognitiveservices.azure.com/"; //URL do enpoint criado no blob storage

        public async Task<string> RecognizeTextAsync(Stream imageStream)
        {
            try
            {
                var client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(_subscriptionKey))
                {
                    Endpoint = _endpoint
                };

                var ocrResult = await client.RecognizePrintedTextInStreamAsync(true, imageStream);

                return ProcessRecognitionResult(ocrResult);
            }catch (Exception ex)
            {
                return "Erro ao reconhecer o texto" + ex.Message;
            }
        }

        private static string ProcessRecognitionResult(OcrResult result)
        {
            try
            {
                string recognizedText = "";

                //percorre todas as regiões
                foreach (var region in result.Regions)
                {
                    //para cada região, percorre as linhas
                    foreach (var line in region.Lines)
                    {
                        //para cada linha, percorre as palavras
                        foreach (var word in line.Words)
                        {
                            //adiciona cada palavra ao texto, separando com espaço
                            recognizedText += word.Text + " ";
                        }

                        //quebra a linha ao final de cada linha
                        recognizedText += "\n";
                    }
                }

                //retorna o text                
                return recognizedText;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
