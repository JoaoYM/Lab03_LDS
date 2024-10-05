package br.com.student_coin_system.service.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarNotificacao(String toEmail, String assunto, String corpo) {
        SimpleMailMessage mensagem = new SimpleMailMessage();
        mensagem.setTo(toEmail);
        mensagem.setSubject(assunto);
        mensagem.setText(corpo);
        mailSender.send(mensagem);
    }
}