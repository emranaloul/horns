'use strict';
$.ajax( '../data/page-1.json' )
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
animal.all = [];


function animal( animalDetails ) {
  this.animalImage = animalDetails.image_url;
  this.animalType = animalDetails.title;
  this.animalDescription = animalDetails.description;
  this.keyword = animalDetails.keyword;
  this.horns = animalDetails.horns;


  animal.all.push( this );

}

// animal.keywordObj = [];
animal.keywordArr = [];

animal.prototype.getKeyword = function (){
  let count = 0;
  animal.keywordArr.push( this );

  for ( let i in animal.keywordArr )
  {
    if ( this.keyword === animal.keywordArr[i].keyword )
      count++;
    if ( count > 1 )
      animal.keywordArr.pop();
  }
  //console.log(Horn.keywordsArr);
};

// keywordArr.forEach( element =>{
//   animal.keywordObj['keyword'] = element;
// } );

console.log( animal.keywordArr );




console.log( keywordArr );


animal.prototype.renderName = function () {

  // let animalClone = $( '#photo-template' ).first().clone();

  // animalClone.find( 'h2' ).text( this.animalType );
  // animalClone.find( 'img' ).attr( 'src', this.animalImage );
  // animalClone.find( 'img' ).attr( 'alt', this.keyword );
  // animalClone.find( 'p' ).text( this.animalDescription );

  // $( 'main' ).append( animalClone );

  let template = $( '#hornsTemplate' ).html();
  let dataSet = Mustache.render( template,this );
  $( 'main' ).append( dataSet );
};

function renderSelect()
{
  for ( let i in animal.keywordArr ){
    // let optionClone = $( '#option-template' ).first().clone();
    // optionClone.text( keywordArr[i] );
    // optionClone.val( keywordArr[i] );
    // $( 'select' ).append( optionClone );

    let optionTemplate = $( '#option-template' ).html();
    let dataSet = Mustache.render( optionTemplate, animal.keywordArr[i] );
    $( '#filter' ).append( dataSet );


  }
}




$( '#filter' ).on( 'change',function(){
  // console.log(`it's changed`);
  // console.log($(this));
  $( 'div' ).hide();
  animal.all = [];
  animal.keywordArr = [];

  console.log( animal.all );
  for( let i = 0; i <= 40; i++ ){
    if( $( this ).val() === $( 'img' ).eq( i ).attr( 'alt' ) ){
      $( 'div' ).eq( i ).show();

    }
  }
  console.log( $( this ).val() );
  console.log( $( this ).text() );
} );

$( '#page2' ).on( 'click', function(){
  $( 'div' ).remove();
  animal.all = [];
  animal.keywordArr = [];
  $( '#filter' ).empty();
  $.ajax( '../data/page-2.json' )
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
} );

$( '#page1' ).on( 'click', function(){
  $( 'div' ).remove();
  $( '#filter' ).empty();
  $.ajax( '../data/page-1.json' )
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
} );


let sortable = [];
for ( let i in animal.all ) {
  sortable.push( [i, animal.all[i]] );

}

console.log( sortable );
$( '#filter2' ).on( 'change', event =>{
  let val = event.target.value;
  let sortable = [];
  for ( let i in animal.all ) {
    sortable.push( [i, animal.all[i].horns] );

  }
  console.log( sortable );
  animal.all.sort( ( a,b ) => {
    console.log( a[val] );
    if( a[val] < b[val] ) return -1;
    else if ( a[val] > b[val] ) return 1;
    else return 0;
  } );

  $( 'main' ).empty();
  animal.all.forEach( item => item.renderName() );
} );


