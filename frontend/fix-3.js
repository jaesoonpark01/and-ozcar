const fs = require('fs');
const files = ['app/my-garage/page.tsx','app/marketplace/page.tsx','app/governance/page.tsx'];
for(const f of files) {
    try {
        let s = fs.readFileSync(f,'utf8');
        s = s.replace(/import MarketplaceLayout from ['"].*MarketplaceLayout['"];?/g,'');
        s = s.replace(/<MarketplaceLayout>/g,'<>');
        s = s.replace(/<\/MarketplaceLayout>/g,'</>');
        const r1 = /from\s+['"]\.\.\/\.\.\/\.\.\/(components|hooks|services|lib)(.*?)['"]/g;
        s = s.replace(r1,"from '@/$1$2'");
        const r2 = /from\s+['"]\.\.\/\.\.\/(components|hooks|services|lib)(.*?)['"]/g;
        s = s.replace(r2,"from '@/$1$2'");
        const r3 = /from\s+['"]\.\.\/(components|hooks|services|lib)(.*?)['"]/g;
        s = s.replace(r3,"from '@/$1$2'");
        fs.writeFileSync(f,s,'utf8');
        console.log('Fixed',f);
    } catch(e) {
        console.error(e);
    }
}
