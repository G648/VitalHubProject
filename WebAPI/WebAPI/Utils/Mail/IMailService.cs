namespace WebAPI.Utils.Mail
{
    public interface IMailService
    {
        //método asincrono para envio de email que recebe mailRequest
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
