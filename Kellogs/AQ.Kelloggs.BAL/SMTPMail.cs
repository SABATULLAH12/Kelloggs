using AQ.Kelloggs.Models;
using AQ.Kelloggs.Models.Utility;
using System;
using System.Net.Mail;


namespace AQ.Kelloggs.BAL
{
    public class SmtpMail
    {
        private Mail mailObj = new Mail();
        readonly string env = System.Configuration.ConfigurationManager.AppSettings["Environment"].ToString(Constants.Culture);
        readonly bool enableSSL = Convert.ToBoolean(System.Configuration.ConfigurationManager.AppSettings["SMTPSecureConnection"].ToString(Constants.Culture),Constants.Culture);
        public SmtpMail()
        {
            MailObj.Host = System.Configuration.ConfigurationManager.AppSettings["SMTPHost"].ToString(Constants.Culture);
            MailObj.Port = Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["SMTPPort"], Constants.Culture);

            MailObj.Password = System.Configuration.ConfigurationManager.AppSettings["MailingPassword"].ToString(Constants.Culture);
            MailObj.From = System.Configuration.ConfigurationManager.AppSettings["MailingEmail"].ToString(Constants.Culture);

        }

        public Mail MailObj
        {
            get
            {
                return mailObj;
            }

            set
            {
                mailObj = value;
            }
        }

        public bool SendMail(AlternateView altView)
        {
            bool mailsendstatus = true;
            SmtpClient smtp = new SmtpClient();
            MailMessage mail = new MailMessage();
            try
            {
                if (MailObj != null)
                {
                    mail.To.Add(MailObj.To);
                    if (!string.IsNullOrEmpty(MailObj.Cc))
                    {
                        mail.CC.Add(MailObj.Cc);
                    }
                    mail.From = new MailAddress(MailObj.From);
                    smtp.Host = MailObj.Host;
                    smtp.Port = MailObj.Port;
                    smtp.Credentials = env == "Dev" ? new System.Net.NetworkCredential(MailObj.From, MailObj.Password) :
                        new System.Net.NetworkCredential("us\\_Landmark_UAT_svc", "%!cQLnhA6=nET$LQ");//Change the credentials for Prod
                    smtp.EnableSsl = enableSSL;
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    mail.Subject = MailObj.Subject;
                    mail.AlternateViews.Add(altView);
                    mail.IsBodyHtml = true;
                    smtp.Send(mail);
                    mailsendstatus = true;
                }
            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.Message);
                throw;
            }
            return mailsendstatus;
        }

        public bool SendMail()
        {
            bool mailsendstatus = true;
            SmtpClient smtp = new SmtpClient();
            MailMessage mail = new MailMessage();
            try
            {
                if (MailObj != null)
                {
                    mail.To.Add(MailObj.To);
                    if (!string.IsNullOrEmpty(MailObj.Cc))
                    {
                        mail.CC.Add(MailObj.Cc);
                    }
                    mail.From = new MailAddress(MailObj.From);
                    smtp.Host = MailObj.Host;
                    smtp.Port = MailObj.Port;
                    smtp.Credentials = env == "Dev" ? new System.Net.NetworkCredential(MailObj.From, MailObj.Password) :
                        new System.Net.NetworkCredential("us\\_Landmark_UAT_svc", "%!cQLnhA6=nET$LQ");//Change the credentials for Prod
                    smtp.EnableSsl = enableSSL;
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    mail.Subject = MailObj.Subject;
                    mail.Body = MailObj.Body;
                    mail.IsBodyHtml = true;
                    smtp.Send(mail);
                    mailsendstatus = true;
                }
            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.Message);
                throw;
            }
            return mailsendstatus;
        }

    }
}
