export default function IframeBottomSlot() {
    const htmlContent = `
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4588747915346334"
             crossorigin="anonymous"></script>
         <!-- iframe -->
         <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-4588747915346334"
             data-ad-slot="6573096876"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
         <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
         </script>
    `;

    return (
        <div className="mt-4 z-20 relative" dangerouslySetInnerHTML={{ __html: htmlContent }} ></div>
    );
}
