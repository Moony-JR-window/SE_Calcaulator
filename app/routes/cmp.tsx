import React, { useState } from 'react';
import Draggable from 'react-draggable';
import ES_and_LS from '~/component/ES_and_LS';

const Cmp = () => {
    const [components, setComponents] = useState<{ id: number; position: { x: number; y: number } }[]>([
        { id: Date.now(), position: { x: 0, y: 0 } }
    ]);

    // Add new component always
    const addComponent = () => {
        setComponents([...components, { id: Date.now(), position: { x: 0, y: 0 } }]);
    };

    // Delete component
    const deleteComponent = (id: number) => {
        setComponents(components.filter((comp) => comp.id !== id));
    };

    return (
        <div className='flex min-h-screen gap-4 flex-col w-full items-center justify-start bg-gradient-to-r from-blue-100 to-purple-200 p-6'>
            {components.map(({ id, position }) => (
                <Draggable key={id} 
                axis="x"
                bounds={{ left: -110, right: 0 }}
                defaultPosition={position}>
                    <div className='relative'>
                        <ES_and_LS />
                        <button
                            onClick={() => deleteComponent(id)}
                            className='absolute top-2 right-5  p-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600'>
                            ✕
                        </button>
                    </div>
                </Draggable>
            ))}
            <button
                onClick={addComponent}
                className='p-3 text-white bg-blue-500 rounded-xl shadow-lg hover:bg-blue-600 transition'>
                Add New
            </button>
        </div>
    );
};

export default Cmp;
