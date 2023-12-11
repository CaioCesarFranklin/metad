
import {View,Text} from 'react-native'
import * as AuthSession from 'expo-auth-session';

function LoginGoogle(){


type AuthResponse = {
    params:{
        access_token:string
    } 
    type:string
}


async function handleLoginGoogle() {
    try {
        
const CLIENT_ID='1041771788399-0t2pbup3ectdamoi5uggvtr1drvatg6q.apps.googleusercontent.com'
const REDIRECT_URI='https://auth.expo.io/@mentorfenix/metad'
const SCOPE=encodeURI('profile email')

const RESPONSE_TYPE='token'
const authUrl= `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirec_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`


    } catch (error) {
        console.log(error)
    }
    
}
    
    return(

        <View style={{backgroundColor:'white', width:500}}>
            <Text>OI sahuie ai asjh asioe</Text>
        </View>
    )
}
export default LoginGoogle