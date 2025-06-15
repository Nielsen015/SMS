'use server'
import { revalidatePath } from 'next/cache';
import { SubjectSchema, subjectSchema } from './formValidationSchema';
import prisma from './prisma';

type currentState = {success: boolean; error: boolean}
// This function creates a new subject in the database
export const createSubject = async (currentState:currentState,data: SubjectSchema) => {
    // console.log(`Your swerver data with ❤️❤️: ${JSON.stringify(data)}`);
    try{
        await prisma.subject.create({
            data:{
                name: data.name,
            }
        });
        // revalidatePath ('/subjects');
        return {success: true, error: false};
    }
    catch (err) {
        console.log(err);
        return{success: false, error: true};
    }
    
}

// This function updates an existing subject in the database
export const updateSubject = async (currentState:currentState,data: SubjectSchema) => {
    // console.log(`Your swerver data with ❤️❤️: ${JSON.stringify(data)}`);
    
    try{
        await prisma.subject.update({
            where: {
                id: data.id,
            },
            data:{
                name: data.name,
            }
        });
        // revalidatePath ('/subjects');
        return {success: true, error: false};
    }
    catch (err) {
        console.log(err);
        return{success: false, error: true};
    }
    
}

// This function deletes a subject from the database
export const deleteSubject = async (currentState:currentState,data: FormData) => {
    // console.log(`Your swerver data with ❤️❤️: ${JSON.stringify(data)}`);
    const id = data.get('id') as string
    try{
        await prisma.subject.delete({
            where: {
                id: parseInt(id),
            }
        });
        // revalidatePath ('/subjects');
        return {success: true, error: false};
    }
    catch (err) {
        console.log(err);
        return{success: false, error: true};
    }
    
}