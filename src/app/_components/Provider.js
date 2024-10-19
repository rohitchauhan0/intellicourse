"use client"

import { apiconnector } from '@/config/apiconnector';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const Provider = ({ children }) => {
   
    return (
        <div>
            {children}
        </div>
    )
}

export default Provider