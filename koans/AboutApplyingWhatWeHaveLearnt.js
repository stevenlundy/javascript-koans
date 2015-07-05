var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = products.filter(function(product){
        return !product.containsNuts && _(product.ingredients).all(function(ingredient){
          return ingredient !== "mushrooms";
        });
      })

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _.range(1,1000).filter(function(num){
      return num % 3 === 0 || num % 5 === 0;
    }).reduce(function(a, b){
      return a + b;
    });    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    _(products.map(function(product){
      return product.ingredients;
    })).chain().flatten().reduce(function(a, b){
      ingredientCount[b] = (ingredientCount[b] || 0) + 1;
    })

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* EXTRA CREDIT */
  function addPrime(primes){
    var primeCandidate = primes[primes.length - 1] + 2;
    do {
      var isPrime = true;
      for(var i = 0; primes[i] <= Math.sqrt(primeCandidate); i++){
        if(primeCandidate%primes[i] === 0){
          isPrime = false;
          primeCandidate += 2;
          break;
        }
      }
    } while(!isPrime);
    primes.push(primeCandidate);
  }

  it("should find the largest prime factor of a composite number", function () {
    function getPrimeFactors(number){
      var primeFactors = [];
      var primes = [2,3,5,7,11];
      var primeIndex = 0;
      while(number > 1){
        if(number%primes[primeIndex] === 0){
          primeFactors.push(primes[primeIndex]);
          number /= primes[primeIndex];
        } else {
          primeIndex++;
          if(primeIndex >= primes.length){
            addPrime(primes);
          }
        }
      }
      return primeFactors;
    }
    function biggestPrimeFactor(number){
      var primeFactors = getPrimeFactors(number);
      return primeFactors.pop();
    }
    expect(biggestPrimeFactor(12)).toBe(3);
    expect(biggestPrimeFactor(33)).toBe(11);
    expect(biggestPrimeFactor(62)).toBe(31);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    function isPalindrome(num){
      return num.toString() === num.toString().split("").reverse().join("");
    }
    function maxPalindromeProduct(){
      var largestPalindrome = 0;
      for(var i = 100; i < 1000; i++){
        for(var j = 100; j < 1000; j++){
          var prod = i*j;
          if(isPalindrome(prod) && prod > largestPalindrome){
            largestPalindrome = prod;
          }
        }
      }
      return largestPalindrome;
    }

    //expect(maxPalindromeProduct(2)).toBe(9009)
    expect(maxPalindromeProduct(3)).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    function smallestMultiple(num){

    }
    
    expect(smallestMultiple(10)).toBe(2520);
    expect(smallestMultiple(20)).toBe(232792560)
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    function sumSquareDiff(num){
      var sumSquare = _.range(1,num+1).map(function(a){
        return a*a;
      }).reduce(function(a,b){
        return a+b;
      });
      var sum = _.range(1,num+1).reduce(function(a,b){
        return a+b;
      });
      return sum*sum-sumSquare;
    }
    
    expect(sumSquareDiff(10)).toBe(3025-385);
    expect(sumSquareDiff(100)).toBe(25164150);
  });

  it("should find the 10001st prime", function () {
    function getPrimeN(n){
      var primes = [2,3,5,7,11,13];
      while(primes.length < n){
        addPrime(primes);
      }
      return primes[n-1];
    }

    expect(getPrimeN(5)).toBe(11);
    expect(getPrimeN(100)).toBe(541);
    expect(getPrimeN(10001)).toBe(104743);
  });

});
