namespace WebAPI.Utils.Mail
{
    public class MailSettings
    {
        //configurações para o remetente
        public string? Email { get; set; }
        //senha do remetente
        public string? Password { get; set;}
        //host do servidor SMTP
        public string? Host { get; set; }
        //nome do remetente
        public string? DisplayName { get; set; }
        //porta do servidor
        public int Port { get; set; }
    }
}
