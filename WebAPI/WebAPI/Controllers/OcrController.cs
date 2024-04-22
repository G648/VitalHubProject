using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Domains;
using WebAPI.Utils.OCR;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OcrController : ControllerBase
    {
        private readonly OcrSettings _ocrService;
        public OcrController(OcrSettings ocrSettings)
        {
            _ocrService = ocrSettings;
        }

        [HttpPost]
        public async Task<IActionResult> RecoginizeText([FromForm] FileUploadModel fileUploadModel)
        {
            try
            {
                //verifica se a imagem foi recebida
                if (fileUploadModel == null || fileUploadModel.Image == null)
                {
                    return BadRequest("Nenhuma imagem fornecida");
                }

                //abre a conexão com o recurso
                using (var stream = fileUploadModel.Image.OpenReadStream())
                {
                    //chama o método para reconhecer a imagem
                   var result = await _ocrService.RecognizeTextAsync(stream);

                    //retorno ok
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest( "erro ao processar a imagem" + ex.Message);
            }
        }
    }
}
