
const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')

const apiURL = 'https://api.lyrics.ovh'

form.addEventListener('submit', (e) => {
  e.preventDefault()
  
  const searchTerm = search.value.trim
  
  if(!searchTerm){
    alert('Please type a search term')
  } else{
    searchSongs(searchTerm)
  } 
})

async function searchSongs(term){
  // fetch(`${apiURL}/suggest/${term}`)
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  const res = await fetch(`${apiURL}/suggest/${term}`)
  const data = await res.json()
  showData(data)
 }

function showData(data){
  let output = ''
  
  data.data.forEach(song => {
    output += `
    <li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    </li>`
    console.log(output)
  })
  
}
