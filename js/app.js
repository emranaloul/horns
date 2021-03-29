$.ajax( './page-1.json' )
  .then( animalData => {
    console.log( animalData );
    animalData.forEach( val => {
      let newAnimal = new animal ( val );
      newAnimal.getKeyword();
      newAnimal.renderName();


    } );
    renderSelect();
    $( '#photo-template' ).first().remove();
  } );

let keywordArr = [];
function animal( animalDetails ) {
  this.animalImage = animalDetails.image_url;
  this.animalType = animalDetails.title;
  this.animalDescription = animalDetails.description;
  this.keyword = animalDetails.keyword;


}

animal.prototype.getKeyword = function (){
  keywordArr.push( this.keyword );

  console.log( this.keyword );
  for( let i in keywordArr ){
    if( this.keyword === keywordArr[ i - 1 ] ){
      keywordArr.pop( this.keyword );
    }
  }
};


console.log( keywordArr );


animal.prototype.renderName = function () {

  let animalClone = $( '#photo-template' ).first().clone();

  animalClone.find( 'h2' ).text( this.animalType );
  animalClone.find( 'img' ).attr( 'src', this.animalImage );
  animalClone.find( 'img' ).attr( 'alt', this.keyword );
  animalClone.find( 'p' ).text( this.animalDescription );

  $( 'main' ).append( animalClone );

};

function renderSelect()
{
  for ( let i in keywordArr ){
    let optionClone = $( '#option-template' ).first().clone();
    optionClone.text( keywordArr[i] );
    optionClone.val( keywordArr[i] );
    $( 'select' ).append( optionClone );
  }
}



$( 'select' ).on( 'change',function(){
  // console.log(`it's changed`);
  // console.log($(this));
  $( 'div' ).hide();
  console.log( $( 'img' ).attr( 'alt' ) );
  for( let i = 0; i <= 19; i++ ){
    if( $( this ).val() === $( 'img' ).eq( i ).attr( 'alt' ) ){
      $( 'div' ).eq( i ).show();

    }
  }
  console.log( $( this ).val() );
  console.log( $( this ).text() );
} );
