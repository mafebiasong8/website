const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '../mafe-portfolio/dist');
const source = 'C:/Users/Ma. Fe Biasong/Documents/Certificates';
const certificates = [
 ['AI Fundamentals: Foundations for Understanding AI', 'ai-foundations.pdf', 'AI_Fundamentals-_Foundations_for_Understanding_AI_certificate_mafebagunas29-gmail-com_7c1bdb90-90f8-4a33-bf67-4f6c10126843 (1).pdf'],
 ['Network Addressing and Basic Troubleshooting', 'network-addressing-and-troubleshooting.pdf', 'Network_Addressing_and_Basic_Troubleshooting_certificate_Biasong_Ma. Fe_B..pdf'],
 ['Introduction to Cybersecurity', 'introduction-to-cybersecurity.pdf', 'Introduction_to_Cybersecurity_certificate_Biasong_Ma. Fe_B..pdf'],
 ['AI Fundamentals: Language and Vision in AI', 'ai-language-and-vision.pdf', 'AI_Fundamentals-_Language_and_Vision_in_AI_certificate_mafebiasong8-gmail-com_611cd5f0-cfd4-4474-b918-87b9504cda74.pdf']
];
fs.mkdirSync(path.join(root, 'certificates'), {recursive:true});
for (const [title, filename, original] of certificates) {
 const data=fs.readFileSync(path.join(source, original));
 if(data.subarray(0,5).toString()!=='%PDF-') throw Error('Invalid PDF: '+original);
 fs.writeFileSync(path.join(root,'certificates',filename),data);
}
const filename=path.join(root,'index.html');
let html=fs.readFileSync(filename,'utf8');
const start=html.indexOf('<div class="certifications">');
const end=html.indexOf('</section>',start);
if(start<0||end<0)throw Error('Certificate section missing');
const rows=certificates.map(([title,file],i)=>`<div class="certificate"><span>0${i+1}</span><h3>${title}</h3><time>2026</time><div class="certificate-actions"><a href="certificates/${file}" target="_blank" rel="noopener noreferrer" aria-label="View certificate: ${title} (opens in a new tab)">View certificate</a><a href="certificates/${file}" download aria-label="Download certificate: ${title}">Download PDF</a></div></div>`).join('');
html=html.slice(0,start)+'<div class="certifications">'+rows+'</div>'+html.slice(end);
fs.writeFileSync(filename,html);
for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
 const value=match[1];
 if(!/^(https?:|mailto:|tel:|data:|#)/.test(value)&&!fs.existsSync(path.join(root,value)))throw Error('Missing asset: '+value);
}
console.log('Added and verified four PDF certificates with view and download links.');
