// Function to concatenate an array in AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeBreedingPair (key, newData) {
    try {
        // Step 1: Retrieve existing array from AsyncStorage
        const existingData = await AsyncStorage.getItem(key);
        if (!Array.isArray(existingData)) {
            const breedingPairs = [newData]

            // Step 3: Save the updated array back to AsyncStorage
            await AsyncStorage.setItem(key, JSON.stringify(breedingPairs));
        } else {
            const parsedExistingBreedingPairs = existingData ? JSON.parse(existingData) : [];

            // Step 2: Concatenate the new data to the existing array
            const updatedData = [...parsedExistingBreedingPairs, ...newData];
            await AsyncStorage.setItem(key, JSON.stringify(updatedData));
        }

        console.log('Array concatenated and stored successfully.');
    } catch (error) {
        console.error('Error concatenating array:', error);
    }
};

/*async function addEmailAddress(userEmailAddress) {
    const emailAddress = new Parse.Object("emailAddresses");
    emailAddress.set("emailAddresses", userEmailAddress);

    try {
        const result = await emailAddress.save();
        console.log('New object created with objectId: ' + result.id);
    } catch (error) {
        console.error('Error: ' + error.message);
    }
}*/