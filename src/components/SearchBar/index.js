import React, { useState } from 'react';
import { Stack, Input, IconButton, Pressable } from 'native-base';

import { styles } from './style';
import colors from './../../constants/colors';

export default function SearchBar(props) {
    const [value, setValue] = useState()

    const handleChangeText = (text) => {
        setValue(text)
    }

    return (
        <Stack space={2} p={2} w="100%" style={{
            position: props.position
        }}

        >
            <Input
                //defaultValue=''
                value={props.textSearch}
                autoCapitalize='none'
                autoCorrect={false}
                variant="rounded"
                backgroundColor='rgba(250,250,250,0.7)'
                borderColor={colors.PRIMARY_COLOR}
                _focus={{
                    borderColor: colors.SECONDARY_COLOR,
                    backgroundColor: 'white',
                }}
                InputRightElement={<IconButton
                    onPress={() => props.handleSearch(value)}
                    size={8} variant="gost"
                    mx={3}
                    _icon={{
                        as: props.icon,
                        name: props.iconName,
                        color: "gray.400"
                    }}
                    _pressed={{
                        bg: colors.PRIMARY_COLOR,
                    }}
                />}
                onChangeText={(e) => handleChangeText(e)}
                status='info'
                placeholder={props.placeholder}
                w="100%"
            />
        </Stack >
    )
}