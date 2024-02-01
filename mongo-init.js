db.createUser({   
    user: 'meryemar',    
     pwd: '123456',    
     roles: [{        
        role: 'dbOwner',       
        db: 'routing'}],  
});