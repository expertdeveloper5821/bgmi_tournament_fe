'use client';
// import React, { useState } from 'react';
// import styles from '../../styles/Dashboard.module.scss';
// //@ts-ignore
// import {Input} from 'technogetic-iron-smart-ui';

// const InputCustomTag = ({ tags, onTagChange, type }:any) => {
//   const [tagInput, setTagInput] = useState('');
//   const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
//     setTagInput(e.target.value);
//   };
//   const handleInputKeyPress = (e:KeyboardEvent) => {
//     if (e.key === 'Enter' && tagInput.trim() !== '') {
//       onTagChange([...tags, tagInput.trim()]);
//       setTagInput('');
//     }
//   };
//   const handleTagRemove = (tagToRemove:any) => {
//     const updatedTags = tags.filter((tag:any) => tag !== tagToRemove);
//     onTagChange(updatedTags);
//   };
//   return (
//     <div className={styles.tag_input_main_cls}>
//       <div className="tags">
//         {tags.map((tag:any) => (
//           <span key={tag} className={styles.tag_textinput}>
//             {tag}
//             <button
//               className={styles.remove_tag_button}
//               onClick={() => handleTagRemove(tag)}
//             >
//               x
//             </button>
//           </span>
//         ))}
//       </div>
//       <Input
//         type={type}
//         className={styles.tag_input_field}
//         placeholder="Add tags..."
//         value={tagInput}
//         onChange={handleInputChange}
//         onKeyPress={handleInputKeyPress}
//       />
      
//     </div>
//   );
// };
// export default InputCustomTag;



/*************** */
// import React, { useState } from 'react';
// import styles from '../../styles/Dashboard.module.scss';
// //@ts-ignore
// import { Input } from 'technogetic-iron-smart-ui';


// interface InputTagProps {
//   type:string;
//   name: string;
//   values: string[]; // Changed from 'tags' to 'values'
//   onChange: (values: string[]) => void; // Changed from 'tags' to 'values'
// }

// const InputCustomTag: React.FC<InputTagProps> = ({type, name, values, onChange }) => {
//   const [inputValue, setInputValue] = useState('');

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };

//   const handleInputBlur = (e:any) => {
//     if (e.key === 'Enter' &&  inputValue.trim() !== '' && !values.includes(inputValue)) {
//       const updatedValues = [...values, inputValue];
//       onChange(updatedValues);
//     }
//     setInputValue('');
//   };

//   const handleTagRemove = (value: string) => {
//     const updatedValues = values.filter(v => v !== value);
//     onChange(updatedValues);
//   };

//   return (
//     <div>
//       {values.map(value => (
//         <span key={value} className="value">
//           {value}
//           <button onClick={() => handleTagRemove(value)}>X</button>
//         </span>
//       ))}
//       <input
//         type={type}
//         name={name}
//         value={inputValue}
//         onChange={handleInputChange}
//         onBlur={handleInputBlur}
//         placeholder="Add a value..."
//       />
//     </div>
//   );
// };

// export default InputCustomTag;

import { useState } from 'react'

function InputCustomTag(){
    const [tags, setTags] = useState<string[]>([])

    function handleKeyDown(e:any){
        if(e.key !== 'Enter') return
        const value = e.target.value
        if(!value.trim()) return
        setTags([...tags, value]  )
        e.target.value = ''
    }

    function removeTag(index:any){
        setTags(tags.filter((el, i) => i !== index))
    }

    return (
        <div className="tags-input-container">
            { tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
            )) }
            <input onKeyDown={handleKeyDown} type="email" className="tags-input" placeholder="Type somthing" />
        </div>
    )
}

export default InputCustomTag