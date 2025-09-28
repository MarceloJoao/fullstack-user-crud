import { useEffect, useState, useRef } from 'react'
import './style.css'
import Excluir from '../../assets/excluir.svg'
import api from '../../services/api'

function Home() {
  //salvando a lista de usuários buscados
  const [users, setUsers] = useState([])

  //referencias
  const inputName = useRef()
  const inputEmail = useRef()
  const inputAge = useRef()

  // Função para buscar usuários
  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    // Atualiza o estado 'users' com os dados recebidos da API
    setUsers(usersFromApi.data)
  }

  // Função para adicionar usuário
  async function addUser() {
    //enviando dados
    await api.post('/usuarios', {
      name: inputName.current.value,
      email: inputEmail.current.value,
      age: ageAsNumber
    })

    // Limpar inputs
    inputName.current.value = ''
    inputEmail.current.value = ''
    inputAge.current.value = ''

    // Atualizar lista de usuários
    getUsers()
  }

  async function deleteUser(id) {
    //enviando requisição PUT com o ID na URL
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de usuários</h1>
        <input type="text" name='nome' placeholder='Nome' ref={inputName} />
        <input type="email" name='email' placeholder='Email' ref={inputEmail} />
        <input type="number" name='idade' placeholder='Idade' ref={inputAge} />
        <button type='button' onClick={addUser}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Email: <span>{user.email}</span></p>
            <p>Idade: <span>{user.age}</span></p>
          </div>
          <button onClick={() => deleteUser(user.id)}>
            <img src={Excluir} alt="Excluir" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
