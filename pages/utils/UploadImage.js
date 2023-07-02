import React from "react";
// Separate Logic for Uploading Image in the Database

const UploadImage = async (Path, images, villageArray) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_URL}/api/upload`
        const token = localStorage.getItem("UserToken")
        let isUploaded = []

        let formdata = new FormData();
        for (let index = 0; index < images.length; index++) {
            formdata.append("files", images[index]);
        }

        formdata.append("village", JSON.stringify(villageArray));
        formdata.append("path", `${Path}`);

        // FormData Console Log
        // console.log(images)
        // formdata.forEach((value, key) => {
        //     console.log("key %s: value %s", key, value);
        // })

        var requestOptions = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formdata,

        };

        const responseJson = await fetch(url, requestOptions)
        const response = await responseJson.json()
        response.map((element) => {
            if (element?.id) {
                isUploaded.push(element?.id)
            }
            else {
                toast.error("unable to a upload Image")
            }
        })

        return isUploaded

    } catch (error) {
        console.log(error)
        return false
    }
}

export default UploadImage