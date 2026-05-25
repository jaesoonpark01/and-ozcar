const fs = require('fs');
const path = require('path');

function fix(dir) {
    for (const f of fs.readdirSync(dir)) {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) {
            fix(p);
        } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
            try {
                let s = fs.readFileSync(p, 'utf8');
                let changed = false;
                
                const r1 = /from\s+['"]\.\.\/\.\.\/\.\.\/(components|hooks|services|lib)(.*?)['"]/g;
                if(r1.test(s)) { s = s.replace(r1, "from '@/$1$2'"); changed = true; }
                
                const r2 = /from\s+['"]\.\.\/\.\.\/(components|hooks|services|lib)(.*?)['"]/g;
                if(r2.test(s)) { s = s.replace(r2, "from '@/$1$2'"); changed = true; }
                
                const r3 = /from\s+['"]\.\.\/(components|hooks|services|lib)(.*?)['"]/g;
                if(r3.test(s)) { s = s.replace(r3, "from '@/$1$2'"); changed = true; }
                
                if(changed) {
                    fs.writeFileSync(p, s, 'utf8');
                    console.log('Fixed imports in', p);
                }
            } catch (e) {
                console.error(e);
            }
        }
    }
}

fix('./app/marketplace');
fix('./app/governance');
fix('./app/my-garage');
