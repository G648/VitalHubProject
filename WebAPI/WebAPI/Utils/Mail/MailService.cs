
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace WebAPI.Utils.Mail
{
    public class MailService : IMailService
    {
        //Variável privada com as configs do email
        private readonly MailSettings mailSettings;

        public MailService(IOptions<MailSettings> options)
        {
            //obtem as configs do email e armazena na variável privada
            mailSettings = options.Value;
        }

        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            try
            {
                //objeto que representa o email
                var email = new MimeMessage();

                //define o remetente do email
                email.Sender = MailboxAddress.Parse(mailSettings.Email);

                //adiciona o destinatário do email
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));

                //define o assunto do email
                email.Subject = mailRequest.Subject;

                //define o corpo do email para requisição
                var builder = new BodyBuilder();

                //define o corpo do email como HTML
                builder.HtmlBody = mailRequest.Body;

                //define o corpo do email no objeto MimeMessage
                email.Body = builder.ToMessageBody();

                //cria um client SMTP para envio de email
                using (var smtp = new SmtpClient())
                {
                    //conecta ao servidor SMTP usando os dados do emailSettings
                    smtp.Connect(mailSettings.Host, mailSettings.Port, SecureSocketOptions.StartTls);

                    //Autentica no servidor SMTP usando os dados do emailSettings
                    smtp.Authenticate(mailSettings.Email, mailSettings.Password);

                    //envia o email assíncrono
                    await smtp.SendAsync(email);
                }
            }
            catch
            {

            }
        }
    }
}
