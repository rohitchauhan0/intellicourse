"use client"
import { db } from '@/config/DB'
import { notesModel } from '@/config/Schema'
import { eq } from 'drizzle-orm'
import { Plus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf'

const Page = () => {
    const [notesData, setnotesData] = useState([])
    const { data: session } = useSession()

    useEffect(() => {
        const getNotes = async () => {
            try {
                const response = await db.select().from(notesModel).where(eq(notesModel?.createdBy, session?.user?.email))
                setnotesData(response)
            } catch (error) {
                console.log(error)
            }
        }
        session && getNotes()
    }, [session])

    const formatNotes = (note) => {
        return Object.keys(note).map((pageKey) => {
            const page = note[pageKey]
            return `### ${page.title}\n${page.content}`
        }).join('\n\n') // Joins each page's content with a line break
    }

    const generatePDF = (item) => {  // Accept the specific item to generate PDF
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth(); // Get page width
        const margin = 10; // Set margin
        let verticalPosition = margin; // Reset vertical position for each note

        // Add Topic and Language
        doc.setFontSize(16);
        doc.text(`Topic: ${item.topic}`, margin, verticalPosition);
        verticalPosition += 10; // Move down

        doc.setFontSize(12);
        doc.text(`Language: ${item.language}`, margin, verticalPosition);
        verticalPosition += 10; // Move down

        // Format notes content and split into lines
        const formattedNotes = formatNotes(item.note);
        const lines = doc.splitTextToSize(formattedNotes, pageWidth - 2 * margin); // Wrap text to fit page width

        // Add wrapped text to the PDF
        doc.setFontSize(10);

        lines.forEach((line) => {
            // Check if we need to add a new page
            if (verticalPosition + 10 > doc.internal.pageSize.getHeight() - margin) { // Adjust for line height
                doc.addPage(); // Add a new page
                verticalPosition = margin; // Reset vertical position
            }
            doc.text(line, margin, verticalPosition);
            verticalPosition += 10; // Move down for the next line
        });

        // Save the PDF with a unique filename based on the topic
        doc.save(`${item.topic}.pdf`);
    };

    return (
        <div className='max-w-screen-xl mx-auto'>
            <div className='w-full flex items-center justify-end'>
                <Link href={"/dashboard/my-notes/create-notes"} className='bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] px-4 py-2 rounded-md text-white font-semibold flex items-center space-x-3'>
                    Create Notes <Plus />
                </Link>
            </div>

            <div>
                {
                    notesData?.map((item, index) => {
                        return (
                            <div key={index} className="p-4 border-b">
                                <h3 className="font-bold text-lg">Topic: {item.topic}</h3>
                                <p className="text-sm">Language: {item.language}</p>
                                <button 
                                    onClick={() => generatePDF(item)}  // Pass the current item to generatePDF
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Download Notes as PDF
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Page;
