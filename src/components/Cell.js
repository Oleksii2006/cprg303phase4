import * as React from 'react';
import { StyleSheet ,View,Text,Pressable} from 'react-native'
export default function Cell({row,col,isBomb,isFlipped,value,handlePress}){
    return(
        <Pressable onPress={() => handlePress(row,col)}>
            <View styles = {[styles.container, !isFlipped && styles.isFlipped]}>
                <Text styles = {styles.text}>
                    {isFlipped && (isBomb ? " bomb" : value)}
                </Text>
            </View>
        </Pressable>
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
    isFlipped:
    {
        backgroundColor: 'lightblue',
    },
    text:
    {
        fontSize:22,
        fontWeight: '800',
    },
})