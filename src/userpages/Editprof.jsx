import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/axios"

export default function Editprof() {
    const { id } = useParams()
    const [form, SetForm] = useState({ name: "", email: "", image: null })
    const navigate = useNavigate()

    useEffect(() => {
        api.get('/user/auth/check')
            .then((res) => {
                if (res.data.loggedIn) {
                    SetForm({
                        name: res.data.user.name,
                        email: res.data.user.email,
                        image: null
                    })
                }
                else {
                    navigate('/uselogin')
                }
            })
    }, [navigate])

  const hnadleChange = (e) =>{
    const {name , value , files} = e.target
    SetForm({...form , [name]: files? files[0]:value})
  }
    return (
        <div>Editprof</div>
    )
}
