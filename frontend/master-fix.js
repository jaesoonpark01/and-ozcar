const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const inPlaceFiles = [
    'app/governance/5x-roadmap/page.tsx',
    'app/governance/constitution/page.tsx',
    'app/governance/onboarding/page.tsx',
    'app/governance/report/page.tsx',
    'app/governance/vote/page.tsx',
    'app/marketplace/[id]/page.tsx',
    'app/marketplace/data/page.tsx',
    'app/my-garage/data-monetization/page.tsx',
    'app/my-garage/live-care/page.tsx',
    'app/my-garage/resale-consulting/page.tsx'
];

const movedFiles = [
    { old: 'app/ambassador/page.tsx', new: 'app/governance/ambassador/page.tsx' },
    { old: 'app/eco-lab/page.tsx', new: 'app/governance/eco-lab/page.tsx' },
    { old: 'app/jury/page.tsx', new: 'app/governance/jury/page.tsx' },
    { old: 'app/social-league/page.tsx', new: 'app/governance/social-league/page.tsx' },
    { old: 'app/insight-lab/page.tsx', new: 'app/marketplace/insight-lab/page.tsx' },
    { old: 'app/sell/page.tsx', new: 'app/marketplace/sell/page.tsx' },
    { old: 'app/trade-in/page.tsx', new: 'app/marketplace/trade-in/page.tsx' },
    { old: 'app/v2g-market/page.tsx', new: 'app/marketplace/v2g-market/page.tsx' },
    { old: 'app/co-driver/page.tsx', new: 'app/my-garage/co-driver/page.tsx' },
    { old: 'app/maintenance/inspection/page.tsx', new: 'app/my-garage/maintenance/inspection/page.tsx' },
    { old: 'app/maintenance/page.tsx', new: 'app/my-garage/maintenance/page.tsx' },
    { old: 'app/sentinel/page.tsx', new: 'app/my-garage/sentinel/page.tsx' },
    { old: 'app/telemetry/page.tsx', new: 'app/my-garage/telemetry/page.tsx' }
];

// Step 1: git checkout
for (const f of inPlaceFiles) {
    try { execSync(`git checkout e68f2983 -- "${f}"`, { stdio: 'inherit' }); } catch(e){}
}
for (const m of movedFiles) {
    try { execSync(`git checkout e68f2983 -- "${m.old}"`, { stdio: 'inherit' }); } catch(e){}
}

// Step 2: move
for (const m of movedFiles) {
    if (fs.existsSync(m.old)) {
        fs.mkdirSync(path.dirname(m.new), { recursive: true });
        fs.renameSync(m.old, m.new);
    }
}

// Step 3: process ALL files
const allFilesToProcess = [...inPlaceFiles, ...movedFiles.map(m => m.new)];

for(const f of allFilesToProcess) {
    if (!fs.existsSync(f)) continue;
    
    let s = fs.readFileSync(f, 'utf8');
    
    // Layout
    s = s.replace(/import MarketplaceLayout from ['"].*MarketplaceLayout['"];?/g, '');
    s = s.replace(/<MarketplaceLayout>/g, '<>');
    s = s.replace(/<\/MarketplaceLayout>/g, '</>');
    
    // Imports
    const r1 = /from\s+['"]\.\.\/\.\.\/\.\.\/(components|hooks|services|lib)(.*?)['"]/g;
    s = s.replace(r1, "from '@/$1$2'");
    const r2 = /from\s+['"]\.\.\/\.\.\/(components|hooks|services|lib)(.*?)['"]/g;
    s = s.replace(r2, "from '@/$1$2'");
    const r3 = /from\s+['"]\.\.\/(components|hooks|services|lib)(.*?)['"]/g;
    s = s.replace(r3, "from '@/$1$2'");
    
    fs.writeFileSync(f, s, 'utf8');
    console.log('Fixed', f);
}
