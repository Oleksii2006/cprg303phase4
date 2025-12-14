import * as React from 'react';
import { StyleSheet ,View,Text} from 'react-native'
export default function Cell({row,col,isBomb,isFlipped,value}){
    return(
        <View styles = {styles.container}>
            <Text styles = {styles.text}>
                {}bomb
            </Text>
        </View>
    )

}
const styles = StyleSheet.create({
    container:
    {
        width:35 ,
        height:35,
        borderWidth:1,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:
    {
        fontSize:22,
    },
})