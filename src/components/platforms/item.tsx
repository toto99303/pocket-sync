import { useMemo } from "react"
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from "recoil"
import {
  PlatformImageSelectorFamily,
  PlatformInfoSelectorFamily,
} from "../../recoil/platforms/selectors"
import { PlatformId } from "../../types"
import { SearchContextSelfHidingConsumer } from "../search/context"

type PlatformItemProps = {
  id: PlatformId
  onClick: () => void
}

export const PlatformItem = ({ id, onClick }: PlatformItemProps) => {
  const { platform } = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(
    PlatformInfoSelectorFamily(id)
  )
  const platformImage = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(
    PlatformImageSelectorFamily(id)
  )

  const category = useMemo(
    () => platform.category || "Uncategorised",
    [platform.category]
  )

  return (
    <SearchContextSelfHidingConsumer
      fields={[platform.name, category, platform.manufacturer]}
    >
      <div className="cores__item" role="button" onClick={onClick}>
        <img src={platformImage} />
        <div className="cores__info-blurb">
          <strong>{platform.name}</strong>
          <div>{category}</div>
          <div>{platform.manufacturer}</div>
          <div>{platform.year}</div>
        </div>
      </div>
    </SearchContextSelfHidingConsumer>
  )
}
