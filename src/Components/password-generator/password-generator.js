import React from 'react';
import { Input } from '../../Ui/input';
import { Select } from '../../Ui/select';
import { Checkbox } from '../../Ui/checkbox';
import { Button } from '../../Ui/Button';
import styles from './password-generator.module.css';


function PasswordGenerator() {
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDFGHIJKLMNOPQRSTUVWXYZ'
    const passwordLengthValues = [12, 13, 14, 15, 16]
    const symbols = '!@#$%^&()+?:{}[]'
    const [result, setResult] = React.useState('')
    const [passwordLength, setPasswordLength] = React.useState(passwordLengthValues[0])
    const [isSymbolUse, setIsSymbolUse] = React.useState(false)
    const [isPasswordCopied, setIsPasswordCopied] = React.useState(false)
 

    function handlePasswordGenerator() {
        let currentReasult = ""
        if (isSymbolUse) {
            chars += symbols
        }
        for (let i = 0; i < passwordLength; i += 1) {
            const randomNumber = Math.floor(Math.random() * chars.length)

            currentReasult += chars.substring(randomNumber, randomNumber + 1)
        }
        setResult(currentReasult)
    }

    function handleBlur(event) {
        setPasswordLength(event.target.value)
    }
    function handleSymbolUse() {
        setIsSymbolUse(!isSymbolUse)
    }
    function handlePasswordCopy() {
        if (result) {
            let timerId = null
            navigator.clipboard.writeText(result).then(() =>{
                setIsPasswordCopied(true)
               timerId = setTimeout(() =>{
                    setIsPasswordCopied(false)
                    clearTimeout(timerId)
                },2000)
            })
        }
    }
    return (
        <div className={styles['root']}>
            <h1 className={styles['title']}>Генератор пароля</h1>
            <div className={styles['result']}>
                <Input type="text" readOnly={true} defaultValue={result}></Input>
                <button className={styles['copy']} onClick={handlePasswordCopy}></button>
               {isPasswordCopied && <span className={styles['copied']}>Скопировано!</span>} 
            </div>
            <div className={styles['option']}>
                <span className={styles['option-name']}>Длина пароля</span>
                <Select options={passwordLengthValues} onBlur={handleBlur}></Select>
            </div>
            <div className={styles['option']}>
                <label className={styles['option-label']} htmlFor="symbols">Использовать спецсимволы</label>
                <Checkbox onChange={handleSymbolUse} defaultChecked={false} id="symbols"> </Checkbox>
            </div>
            <Button type="button" onClick={handlePasswordGenerator}>Сгенерировать пароль</Button>
        </div>
    )
}
export { PasswordGenerator }