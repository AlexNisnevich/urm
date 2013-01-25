**[urm](http://alex.nisnevich.com/experiments/urm/)** is an implementation of a register machine based on the **Unlimited Register Machine** described by N.J. Cutland in _Computability: An introduction to recursive function theory_. 

urm has 10 registers (marked R1 through R10) and supports four commands.

### Commands

- **Zero**: Z(x) sets the entry in register x to 0.
- **Successor**: S(x) increments the entry in register x by 1.
- **Transfer**: T(x,y) replaces the entry in register y with the entry in register x.
- **Jump**: J(x,y,l) jumps to line l of the program iff the contents of registers x and y are equal.

### Example

The following program returns `max(n-1,0)` in R1, given input `n` in R1.

```
1. Z(2)
2. J(1,2,10)
3. Z(3)
4. S(2)
5. J(1,2,9)
6. S(2)
7. S(3)
8. J(1,1,5)
9. T(3,1)
10. HALT
```

*(Line 10 can be left blank, or given any contents that are not a command. I write 'HALT' by convention).*
