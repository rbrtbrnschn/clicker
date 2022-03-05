- [x] upgrades - explicit set of upgrades
- [x] upgrade clickstrength

- [x] prestige systems 
- [x] tokens
-  => unlock events

- [x] make events unlockable 
- [x] auto clicker unlockable 
- [x] achievements => unlocks invisible auto-clicker

- prestige kills badges 
- add cpsModifier 
- upgrades visible once 1/100 threshold reached
- upgrades disapear on max
- achievement section ? marks undiscovered achievements 
- upgrade section ? marks locked upgrades
- create config to use for base Click Strength so we can reset to defaults

- refactor to service oriented structure


cps: 10
cpsModifier: 2
cps = cps * cpsModifier;

upgrade: cpsModifier = cpsModifier * 1.1; // => 22 cps; // relational update, 10% increase
upgraded2: cpsModifier = cpsModifier + 1; // => 30 cps; // unrelational update, add 1 to modifier

