import {
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {useEffect, useState} from "react";
import Task from "../components/Task";
import axios from "axios";


function Dashboard({navigation}) {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);

    //Fetch
    //Display
    useEffect(() => {
        axios.get("https://todo-app-rn.herokuapp.com/api/task/")
            .then(response => {
                setTaskItems(response.data);
                console.log(response.data)
            })
    }, []);


    const handleAddTask = (e) => {
        Keyboard.dismiss();
        axios.put("https://todo-app-rn.herokuapp.com/api/task/", {
            task
        }).then(res => {
            setTaskItems([...taskItems, res.data])
            setTask(null);
        })

    }

    //Update
    const completeTask = (index) => {
        axios.delete("https://todo-app-rn.herokuapp.com/api/task/update/", {
            id: taskItems._id
        }).then(() => {
            let itemsCopy = [...taskItems];
            itemsCopy.splice(index, 1);
            setTaskItems(itemsCopy)
        })
    }


    return (
        <View style={styles.container}>
            {/* Added this scroll view to enable scrolling when list gets longer than the page */}
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1
                }}
                keyboardShouldPersistTaps='handled'
            >

                {/* Today's Tasks */}
                <View style={styles.tasksWrapper}>
                    <Text style={styles.userTitle}>Hi!</Text>
                    {taskItems.length === 0 ? <Text style={styles.sectionTitle}>Plan your day</Text> :
                        <Text style={styles.sectionTitle}>Today's tasks</Text>}
                    <View style={styles.items}>

                        {taskItems.map((item, index) =>
                            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                                <Task text={item.task}/>
                            </TouchableOpacity>
                        )}

                    </View>
                </View>

            </ScrollView>

            {/* Write a task */}
            {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}
            >
                <TextInput placeholderTextColor="#003f5c" style={styles.input} placeholder={'Write a task'} value={task}
                           onChangeText={text => setTask(text)}/>
                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#131313',
    },
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#fff",
        paddingLeft: 50
    },
    userTitle: {
        fontSize: 38,
        color: "#fff",
    },
    items: {
        marginTop: 30,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        color: "#fff",
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: "#171717",
        borderRadius: 60,
        width: 250,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: "#208bff",
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    addText: {},
});
export default Dashboard;
