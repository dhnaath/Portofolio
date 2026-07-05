#!/bin/bash
# Move lines 663-717 to line 582
sed -i -e '663,717H; 663,717d; 581G' src/app/App.tsx
