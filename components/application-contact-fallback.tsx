export function ApplicationContactFallback({ checking = false }: { checking?: boolean }) {
  return <div data-application-contact-fallback className="space-y-4">
    <p role="status">{checking ? "Çevrimiçi başvuru durumu kontrol ediliyor. Bu sırada telefon veya WhatsApp üzerinden iletişime geçebilirsiniz." : "Çevrimiçi başvuru kaydı şu anda kapalı. Telefon veya WhatsApp üzerinden bizimle görüşebilirsiniz."}</p>
    <div className="ef-actions">
      <a className="ef-button" href="tel:+905416061356">Ara · 0 541 606 13 56</a>
      <a className="ef-text-link" href="https://wa.me/905416061356" target="_blank" rel="noopener noreferrer">WhatsApp’tan yazın</a>
    </div>
    <p className="text-xs text-muted-foreground">Bu bağlantılar sitede başvuru kaydı veya takip numarası oluşturmaz. WhatsApp ayrı bir dış hizmettir. Kimlik, kart, hesap veya banka şifresi paylaşmayın.</p>
  </div>;
}
