var majorityElement = function(numbers) {
    let count = 0;
    let candidate = null;

    for (let num of numbers) {
        if (count === 0) {
            candidate = num;
        }

        count += (num === candidate) ? 1 : -1;
    }
 
    return candidate;
};