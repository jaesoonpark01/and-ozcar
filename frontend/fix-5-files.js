const fs = require('fs');
const files = [
    'app/governance/constitution/page.tsx',
    'app/governance/report/page.tsx',
    'app/governance/vote/page.tsx',
    'app/governance/5x-roadmap/page.tsx',
    'app/governance/social-league/page.tsx'
];

for(const f of files) {
    try {
        let s = fs.readFileSync(f, 'utf8');
        
        // Fix Layout
        s = s.replace(/import MarketplaceLayout from ['"].*MarketplaceLayout['"];?/g, '');
        s = s.replace(/<MarketplaceLayout>/g, '<>');
        s = s.replace(/<\/MarketplaceLayout>/g, '</>');
        
        // Fix Imports
        let changed = false;
        const r1 = /from\s+['"]\.\.\/\.\.\/\.\.\/(components|hooks|services|lib)(.*?)['"]/g;
        if(r1.test(s)) { s = s.replace(r1, "from '@/$1$2'"); changed = true; }
        
        const r2 = /from\s+['"]\.\.\/\.\.\/(components|hooks|services|lib)(.*?)['"]/g;
        if(r2.test(s)) { s = s.replace(r2, "from '@/$1$2'"); changed = true; }
        
        const r3 = /from\s+['"]\.\.\/(components|hooks|services|lib)(.*?)['"]/g;
        if(r3.test(s)) { s = s.replace(r3, "from '@/$1$2'"); changed = true; }
        
        fs.writeFileSync(f, s, 'utf8');
        console.log('Fixed', f);
    } catch(e) {
        console.error(e);
    }
}
