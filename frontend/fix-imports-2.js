const fs = require('fs');
const files = [
    'app/governance/eco-lab/page.tsx',
    'app/governance/jury/page.tsx',
    'app/governance/onboarding/page.tsx'
];

for(const f of files) {
    try {
        let s = fs.readFileSync(f, 'utf8');
        s = s.replace(/from\s+['"]\.\.\/\.\.\/(components|hooks|services|lib)['"]/g, "from '@/$1'");
        s = s.replace(/from\s+['"]\.\.\/\.\.\/\.\.\/(components|hooks|services|lib)['"]/g, "from '@/$1'");
        s = s.replace(/from\s+['"]\.\.\/(components|hooks|services|lib)['"]/g, "from '@/$1'");
        fs.writeFileSync(f, s, 'utf8');
        console.log('Fixed imports in', f);
    } catch(e) {
        console.error(e);
    }
}
