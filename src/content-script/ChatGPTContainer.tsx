import { useState } from 'react'
import useSWRImmutable from 'swr/immutable'
import { fetchPromotion } from '../api'
import { TriggerMode } from '../config'
import ChatGPTCard from './ChatGPTCard'
import { QueryStatus } from './ChatGPTQuery'

interface Props {
  question: string
  contextIds: string[]
  requestParams: string[]
  promptSource: string
  triggerMode: TriggerMode
}

function ChatGPTContainer(props: Props) {
  const [queryStatus, setQueryStatus] = useState<QueryStatus>()
  const query = useSWRImmutable(
    queryStatus === 'success' ? 'promotion' : undefined,
    fetchPromotion,
    { shouldRetryOnError: false },
  )

  console.log('props at ChatGPTContainer:', props)
  return (
    <>
      <div className="chat-gpt-card">
        <ChatGPTCard
          question={props.question}
          contextIds={props.contextIds}
          requestParams={props.requestParams}
          promptSource={props.promptSource}
          triggerMode={props.triggerMode}
          onStatusChange={setQueryStatus}
        />
      </div>
    </>
  )
}

export default ChatGPTContainer
