
using MailKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace WebAPI.Utils.Mail
{
    public class MailService : IMailService
    {
        //Variável privada com as configs do email
        private readonly EmailSettings emailSettings;

        public MailService(IOptions<EmailSettings> options)
        {
            //obtem as configs do email e armazena na variável privada
            emailSettings = options.Value;
        }

        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            try
            {
                //objeto que representa o email
                var email = new MimeMessage();

                //define o remetente do email
                email.Sender = MailboxAddress.Parse(emailSettings.Email);

                //adiciona o destinatário do email
                email.To.Add(MailboxAddress.Parse(emailRequest.ToEmail));

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
                    smtp.Connect(emailSettings.Host, emailSettings.Port, SecureSocketOptions.StartTls);

                    smtp.Authenticate(emailSettings.Email, emailSettings.Password);

                    await smtp.SendAsync(email);
                }
            }
            catch
            {

            }
        }
    }
}
