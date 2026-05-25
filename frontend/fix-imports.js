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
                // Replace ../../ components with @/components
                s = s.replace(/from\s+['"]\.\.\/\.\.\/(components|hooks|services|lib)['"]/g, "from '@/$1'");
                // Also replace ../../../ 
                s = s.replace(/from\s+['"]\.\.\/\.\.\/\.\.\/(components|hooks|services|lib)['"]/g, "from '@/$1'");
                // And ../
                s = s.replace(/from\s+['"]\.\.\/(components|hooks|services|lib)['"]/g, "from '@/$1'");
                
                fs.writeFileSync(p, s, 'utf8');
                console.log('Fixed imports:', p);
            } catch (e) {
                console.error(e);
            }
        }
    }
}

fix('./app');
