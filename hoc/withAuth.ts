import { useRouter } from "next/router"

const WithAuth=(props:any)=>{
    // const navigate=useRouter();
    // const token=JSON.parse(localStorage.getItem("token")??"{}");
    // console.log(token);
    return props.children;

}

export default WithAuth