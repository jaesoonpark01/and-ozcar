const fs = require('fs');
const files = [
    'app/governance/eco-lab/page.tsx',
    'app/governance/jury/page.tsx',
    'app/governance/onboarding/page.tsx'
];

for(const f of files) {
    try {
        let s = fs.readFileSync(f, 'utf8');
        s = s.replace(/import MarketplaceLayout from ['"].*MarketplaceLayout['"];?/g, '');
        s = s.replace(/<MarketplaceLayout>/g, '<>');
        s = s.replace(/<\/MarketplaceLayout>/g, '</>');
        fs.writeFileSync(f, s, 'utf8');
        console.log('Fixed layout in', f);
    } catch(e) {
        console.error(e);
    }
}
