const characters = () => {
    const result = [];
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  
    // Generate single characters: a through z
    for (let i = 0; i < alphabet.length; i++) {
      result.push(alphabet[i]);
    }
  
    // Generate two-character combinations: aa through zz
    for (let i = 0; i < alphabet.length; i++) {
      for (let j = 0; j < alphabet.length; j++) {
        result.push(alphabet[i] + alphabet[j]);
      }
    }
  
    // Generate three-character combinations: aaa through zzz
    // for (let i = 0; i < alphabet.length; i++) {
    //   for (let j = 0; j < alphabet.length; j++) {
    //     for (let k = 0; k < alphabet.length; k++) {
    //       result.push(alphabet[i] + alphabet[j] + alphabet[k]);
    //     }
    //   }
    // }

    // for(let i=0;i<9;i++){
    //   result.push(i);
    // }
  
    return result;
  };
  
  module.exports = characters;