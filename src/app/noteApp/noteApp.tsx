'use client'
import { useEffect, useRef, useState } from "react";
import Colors from "./colors";
import Notes from "./notes";

interface Notes {
    id: number,
    title: string,
    color: string,
    completed: boolean
}



const NoteApp = () => {

    const [notes, setNotes] = useState<Notes[]>([])
    const [noteTitle, setNoteTitle] = useState<string>('')
    const [inputColor, setInputColor] = useState<string>('')
    const [status, setStatus] = useState<string>('all')
    const [colors] = useState<string[]>([
        '#f8fafc',
        '#f87171',
        '#fb923c',
        '#facc15',
        '#84cc16',
        '#2dd4bf',
        '#4ade80',
        '#22d3ee',
        '#60a5fa',
        '#8b5cf6',
        '#d946ef',
        '#fb7185',
    ])



    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem("todos") || "[]") as Notes[];
        setNotes(storedNotes)
    },[])


    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(notes));
    },[notes])

    const inputRef = useRef(null)

    const noteTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNoteTitle(e.target.value)
    }

    const inputColorHandler = (color: string) => {
        setInputColor(color)
    }

    const addTodo = () => {


        const newNote = {
            id: Date.now(),
            title: noteTitle,
            color: inputColor,
            completed: false
        }

        if (noteTitle) {
            setNotes([...notes, newNote])
        }
        setNoteTitle('')

    };

    const emptyInput = () => {
        setInputColor('#f8fafc')
        setNoteTitle('')
    }


    const removeNote = (noteId: number) => {
        const removeNote = notes.filter(note => note.id !== noteId)
        setNotes( removeNote)
    };


    const editNotes = (noteId: number) => {
        const newNote = [...notes]

        newNote.forEach(note => {
            if (note.id === noteId) {
                note.completed = !note.completed
            }
        });
        setNotes(newNote)

    };

    const filterTodo = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value)
    }





    return (
        <>
            <header className="flex justify-center items-center h-32 text-3xl text-green-900">ALI NOTE APP</header>

            <div className="flex flex-col items-center w-full">
                <div className="flex flex-col  md:flex-row justify-center items-start md:items-center mt-5 mb-2 w-1/2">
                    <input ref={inputRef} placeholder="Write NoteApp..." style={{ backgroundColor:inputColor }} onChange={noteTitleHandler} value={noteTitle} type="text" className="rounded outline-none placeholder-black placeholder-opacity-50  w-full h-12 p-3 font-serif text-xl mb-3 md:m-0 text-black " />


                    <select onChange={filterTodo} name="Todo" className=" outline-none ml-2 h-12 w-30 cursor-pointer text-xs text-purple-900 font-sans rounded">
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">UnCompleted</option>
                    </select>

                </div>

                <div className="flex justify-start items-center w-1/2  ">
                    {colors.map((item,i) => <Colors  onColor={inputColorHandler} key={i} color={item} />)}
                </div>

                <div className=' w-1/2 h-20 mb-5 flex items-start justify-end' >
                    <button onClick={addTodo} className="bg-white flex justify-center items-center w-10 h-10 mr-2 mt-3"><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="#75FB4C"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg></button>
                    <button onClick={emptyInput} className="bg-gray-300 flex justify-center items-center h-10 w-10 mt-3"><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="#8C1A10"><g><rect fill="none" height="30" width="30" x="0" /></g><g><g><rect height="2" opacity=".3" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -8.2634 10.636)" width="10.14" x="3.64" y="14.29" /><polygon points="20,7 20.94,4.94 23,4 20.94,3.06 20,1 19.06,3.06 17,4 19.06,4.94" /><polygon points="8.5,7 9.44,4.94 11.5,4 9.44,3.06 8.5,1 7.56,3.06 5.5,4 7.56,4.94" /><polygon points="20,12.5 19.06,14.56 17,15.5 19.06,16.44 20,18.5 20.94,16.44 23,15.5 20.94,14.56" /><path d="M17.71,9.12l-2.83-2.83C14.68,6.1,14.43,6,14.17,6c-0.26,0-0.51,0.1-0.71,0.29L2.29,17.46c-0.39,0.39-0.39,1.02,0,1.41 l2.83,2.83C5.32,21.9,5.57,22,5.83,22s0.51-0.1,0.71-0.29l11.17-11.17C18.1,10.15,18.1,9.51,17.71,9.12z M5.83,19.59l-1.41-1.41 L11.59,11L13,12.41L5.83,19.59z M14.41,11L13,9.59l1.17-1.17l1.41,1.41L14.41,11z" /></g></g></svg></button>
                </div>

            </div>

            <div className=" w-full">
                <ul className="flex flex-col justify-center items-center ">
                    {status === 'all' && notes.map(note => (
                        <Notes key={note.id} {...note} onRemove={removeNote} onEdit={editNotes} />
                    ))}

                    {status === 'completed' && notes.filter(item => item.completed).map(
                        note => (
                            <Notes key={note.id} {...note} onRemove={removeNote} onEdit={editNotes} />
                        ))
                    }

                    {status === 'uncompleted' && notes.filter(item => item.completed == false ).map(
                        note => (
                            <Notes key={note.id} {...note} onRemove={removeNote} onEdit={editNotes} />
                        ))
                    }


                </ul>
            </div>

        </>
    );
}

export default NoteApp;
