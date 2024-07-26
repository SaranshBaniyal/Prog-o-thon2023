from web3 import Web3
from django.conf import settings

web3 = Web3(Web3.HTTPProvider(settings.WEB3_PROVIDER_URI))
contract = web3.eth.contract(address=settings.CONTRACT_ADDRESS, abi=settings.CONTRACT_ABI)

def get_nonce():
    return web3.eth.getTransactionCount(settings.OWNER_ADDRESS)

def add_voter_to_contract(voter_address):
    nonce = get_nonce()
    txn = contract.functions.addVoter(voter_address).buildTransaction({
        'chainId': 11155111,  # Network ID
        'gas': 2000000,  # Gas limit
        'gasPrice': web3.toWei('20', 'gwei'),  # Gas price
        'nonce': nonce,  # Transaction nonce
        'from': settings.OWNER_ADDRESS,  # Sender address
    })
    signed_txn = web3.eth.account.sign_transaction(txn, private_key=settings.OWNER_PRIVATE_KEY)
    tx_hash = web3.eth.sendRawTransaction(signed_txn.rawTransaction)
    return web3.toHex(tx_hash)

def create_election_in_contract(candidate_names, end_datetime, position):
    nonce = get_nonce()
    txn = contract.functions.createElection(candidate_names, end_datetime, position).buildTransaction({
        'chainId': 11155111,
        'gas': 2000000,  # Gas limit
        'gasPrice': web3.toWei('20', 'gwei'),  # Gas price
        'nonce': nonce,  # Transaction nonce
        'from': settings.OWNER_ADDRESS,  # Sender address
    })
    signed_txn = web3.eth.account.sign_transaction(txn, private_key=settings.OWNER_PRIVATE_KEY)
    tx_hash = web3.eth.sendRawTransaction(signed_txn.rawTransaction)
    return web3.toHex(tx_hash)

def verify_voter_face(election_id, voter_address):
    nonce = get_nonce()
    txn = contract.functions.verifyVoterFace(election_id, voter_address).buildTransaction({
        'chainId': 11155111,  # Network ID
        'gas': 2000000,  # Gas limit
        'gasPrice': web3.toWei('20', 'gwei'),  # Gas price
        'nonce': nonce,  # Transaction nonce
        'from': settings.OWNER_ADDRESS,  # Sender address
    })
    signed_txn = web3.eth.account.sign_transaction(txn, private_key=settings.OWNER_PRIVATE_KEY)
    tx_hash = web3.eth.sendRawTransaction(signed_txn.rawTransaction)
    return web3.toHex(tx_hash)
