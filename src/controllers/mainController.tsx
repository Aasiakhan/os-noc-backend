import { Html } from '@elysiajs/html'

export const MainController = async () => {
    return (
        <html lang='en'>
            <head>
                <title>Owlsense NOC App</title>
            </head>
            <body style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#222",height:"100vh",fontFamily:"sans-serif"}} >
                <h1 style={{color:"#666"}}>Owlsense NOC Server</h1>
                <h2 style={{fontSize:"1rem",color:"#aaa"}}><span style={{width:"0.8rem",height:"0.8rem",display:"inline-block",marginRight:"0.4rem",borderRadius:"1rem",background:"springgreen"}}></span>
                    ONLINE
                </h2>
            </body>
        </html>
    )
}