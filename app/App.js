import { StyleSheet, Text, View, Pressable } from 'react-native';

import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';
// Add in the useWalletConnectModal hook

const projectId = '3f1fff6fa5b4b39319e66d9b5426779f';

const providerMetadata = {
  name: 'BlocBallot',
  description: 'YOUR_PROJECT_DESCRIPTION',
  url: 'https://your-project-website.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

export default function App() {
  // Add in the useWalletConnectModal hook + props
  const { open, isConnected, address, provider } = useWalletConnectModal();

  // Function to handle the
  const handleButtonPress = async () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Test Modale RN Tutorial</Text>
      <Text>{isConnected ? address : 'No Connected'}</Text>
      <Pressable
        onPress={handleButtonPress}
        style={styles.pressableMargin}
      >
        <Text>{isConnected ? 'Disconnect' : 'Connect'}</Text>
      </Pressable>

      <WalletConnectModal
        explorerRecommendedWalletIds={[
          'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        ]}
        explorerExcludedWalletIds={'ALL'}
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  pressableMargin: {
    marginTop: 16,
  },
});
