namespace WebAPI.Utils.Mail
{
    public class MailRequest
    {
        //destinatário 
        public string? ToEmail { get; set; }
        //assunto
        public string? Subject { get; set; }
        //corpo do email
        public string? Body { get; set; }
    }
}
