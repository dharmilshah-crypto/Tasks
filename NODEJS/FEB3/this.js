function hi(a=5)
{ 
    // a = 5;
    console.log(a);
    console.log(this.a);
}
let a = 20;
hi(17);